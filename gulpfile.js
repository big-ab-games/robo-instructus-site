const gulp = require('gulp');
const { exec } = require('child_process');
const browserSync = require('browser-sync').create();

let jekyllProcess;

gulp.task('build', () => {
  if (jekyllProcess) jekyllProcess.kill();
  jekyllProcess = exec('jekyll build --watch --drafts', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});

gulp.task('reload-browser', () => browserSync.reload());

gulp.task('serve', () => {
    browserSync.init({server: {baseDir: '_site/'}});
    gulp.watch('_site/**/*.*', ['reload-browser']);
    gulp.watch(['_config.yml', '_drafts/*.*', '_includes/*.*', '_layouts/*.*'], ['build']);
});

gulp.task('default', ['build', 'serve']);
