const gulp = require('gulp');
const { exec } = require('child_process');
const browserSync = require('browser-sync').create();

let jekyllProcess;

function build(done) {
  if (jekyllProcess) jekyllProcess.kill();
  jekyllProcess = exec('jekyll build --watch --drafts', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  done()
}

function reloadBrowser(done) {
  browserSync.reload()
  done()
}

function serve(done) {
  browserSync.init({server: {baseDir: '_site/'}});
  gulp.watch('_site/**/*.*', reloadBrowser);
  gulp.watch(['_config.yml', '_drafts/*.*', '_includes/*.*', '_layouts/*.*'], build);
  done()
}

exports.default = gulp.series(build, serve);
