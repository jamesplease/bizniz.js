import gulp  from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import fs from 'fs';
import del  from 'del';
import glob  from 'glob';
import path  from 'path';
import mkdirp from 'mkdirp';
import {Instrumenter} from 'isparta';
import rollup from 'rollup';
import jsonPlugin from 'rollup-plugin-json';
import commonjsPlugin from 'rollup-plugin-commonjs';
import rollupBabelPlugin from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import multiEntryPlugin from 'rollup-plugin-multi-entry';
import rollupBabelEs2015Present from 'babel-preset-es2015-rollup';

import mochaGlobals from './test/setup/.globals';
import manifest  from './package.json';

// Load all of our Gulp plugins
const $ = loadPlugins();

// Gather the library data from `package.json`
const config = manifest.babelBoilerplateOptions;
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile, path.extname(mainFile));

function cleanDist(done) {
  del([destinationFolder]).then(() => done());
}

function cleanTmp(done) {
  del(['tmp']).then(() => done());
}

function onError() {
  $.util.beep();
}

// Lint a set of files
function lint(files) {
  return gulp.src(files)
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())
    .pipe($.jscs())
    .pipe($.jscs.reporter())
    .pipe($.jscs.reporter('fail'))
    .on('error', onError);
}

function lintSrc() {
  return lint('src/**/*.js');
}

function lintTest() {
  return lint('test/**/*.js');
}

function lintGulpfile() {
  return lint('gulpfile.babel.js');
}

function build(done) {
  rollup.rollup({
    entry: path.join('src', config.entryFileName + '.js'),
    plugins: [
      nodeResolve({
        jsnext: true,
        /*
         * Uncomment the following line to specify external
         * deps to exclude from the bundle. By default, everything
         * is bundled into the build
         */
        // skip: ['jquery'],
        main: true
      }),
      rollupBabelPlugin({
        sourceMaps: true,
        presets: [rollupBabelEs2015Present],
        babelrc: false
      }),
      // This allows you to require in CJS modules
      commonjsPlugin(),
      // This allows you to require in JSON files
      jsonPlugin()
    ]
  }).then(function(bundle) {
    var result = bundle.generate({
      format: 'umd',
      sourceMap: 'inline',
      sourceMapSource: config.entryFileName + '.js',
      sourceMapFile: exportFileName + '.js',
      moduleName: config.mainVarName
    });
    var code = `${result.code}\n//# sourceMappingURL=./${exportFileName}.js.map`;

    // Write the generated sourcemap
    mkdirp.sync(destinationFolder);
    fs.writeFileSync(path.join(destinationFolder, exportFileName + '.js'), code);
    fs.writeFileSync(path.join(destinationFolder, `${exportFileName}.js.map`), result.map.toString());

    $.file(exportFileName + '.js', code, { src: true })
      .pipe($.plumber())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.sourcemaps.write('./', {addComment: false}))
      .pipe(gulp.dest(destinationFolder))
      .pipe($.filter(['*', '!**/*.js.map']))
      .pipe($.rename(exportFileName + '.min.js'))
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(destinationFolder))
      .on('end', done);
  }).catch(console.error);
}

function _mocha() {
  return gulp.src(['test/setup/node.js', 'test/unit/**/*.js'], {read: false})
    .pipe($.mocha({
      reporter: 'dot',
      globals: Object.keys(mochaGlobals.globals),
      ignoreLeaks: false
    }));
}

function _registerBabel() {
  require('babel-register');
}

function test() {
  _registerBabel();
  return _mocha();
}

function coverage(done) {
  _registerBabel();
  gulp.src(['src/**/*.js'])
    .pipe($.istanbul({ instrumenter: Instrumenter }))
    .pipe($.istanbul.hookRequire())
    .on('finish', () => {
      return test()
        .pipe($.istanbul.writeReports())
        .on('end', done);
    });
}

const watchFiles = ['src/**/*', 'test/**/*', 'package.json', '**/.eslintrc', '.jscsrc'];

// Run the headless unit tests as you make changes.
function watch() {
  gulp.watch(watchFiles, ['test']);
}

var firstBuild = true;
function testBrowser(done) {

  // Our testing bundle is made up of our unit tests, which
  // should individually load up pieces of our application.
  // We also include the browser setup file.
  const testFiles = glob.sync('./test/unit/**/*.js');
  const allFiles = ['./test/setup/browser.js'].concat(testFiles);

  rollup.rollup({
    entry: allFiles,
    plugins: [
      nodeResolve({
        jsnext: true,
        /*
         * Uncomment the following line to specify external
         * deps to exclude from the bundle. By default, everything
         * is bundled into the build
         */
        // skip: ['jquery'],
        main: true
      }),
      // This allows you to require in JSON files. It *must* be
      // listed before Babel.
      jsonPlugin(),
      rollupBabelPlugin({
        sourceMaps: true,
        presets: [rollupBabelEs2015Present],
        babelrc: false
      }),
      // This allows you to require in CJS modules
      commonjsPlugin(),

      // This is necessary to resolve all of the test paths
      multiEntryPlugin.default()
    ]
  }).then(function(bundle) {
    var result = bundle.generate({
      format: 'umd',
      sourceMap: 'inline',
      sourceMapSource: config.entryFileName + '.js',
      sourceMapFile: exportFileName + '.js',
      moduleName: config.mainVarName
    });
    var code = result.code + '\n//# sourceMappingURL=./__spec-build.js.map';

    // Write the generated sourcemap
    mkdirp.sync('tmp');
    fs.writeFileSync(path.join('tmp', '__spec-build.js'), code);
    fs.writeFileSync(path.join('tmp', '__spec-build.js.map'), result.map.toString());

    if (firstBuild) {
      $.livereload.listen({port: 35729, host: 'localhost', start: true});
      var watcher = gulp.watch(watchFiles, ['test-browser']);
    } else {
      $.livereload.reload('./tmp/__spec-build.js');
    }
    firstBuild = false;

    done();
  }).catch(console.error);
}

// Remove the built files
gulp.task('clean', cleanDist);

// Remove our temporary files
gulp.task('clean-tmp', cleanTmp);

// Lint our source code
gulp.task('lint-src', lintSrc);

// Lint our test code
gulp.task('lint-test', lintTest);

// Lint this file
gulp.task('lint-gulpfile', lintGulpfile);

// Lint everything
gulp.task('lint', ['lint-src', 'lint-test', 'lint-gulpfile']);

// Build two versions of the library
gulp.task('build', ['lint', 'clean'], build);

// Lint and run our tests
gulp.task('test', ['lint'], test);

// Set up coverage and run tests
gulp.task('coverage', ['lint'], coverage);

// Set up a livereload environment for our spec runner `test/runner.html`
gulp.task('test-browser', ['lint', 'clean-tmp'], testBrowser);

// Run the headless unit tests as you make changes.
gulp.task('watch', watch);

// An alias of test
gulp.task('default', ['test']);
