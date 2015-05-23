module.exports = function(grunt) {

 var fileOrder = ['src/core.js', 'src/*/*.js'];

 grunt.initConfig({
   concat: {
    dist: {
      src: fileOrder,
      dest: 'dist/framework.js',
    },
   },
   uglify: {
     options: {
       mangle: false
     },
     my_target: {
       files: {
         'dist/framework.min.js': fileOrder
       }
     }
   },
   watch: {
     scripts: {
       files: fileOrder,
       tasks: ['concat', 'uglify'],
       options: {
         spawn: false,
       },
     },
   }
 });

 grunt.loadNpmTasks('grunt-contrib-uglify');

 grunt.loadNpmTasks('grunt-contrib-concat');

grunt.loadNpmTasks('grunt-contrib-watch');

 grunt.registerTask('default', ['uglify', 'concat', 'watch']);

};