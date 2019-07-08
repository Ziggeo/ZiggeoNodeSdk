module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');
    var gruntHelper = require('betajs-compile');
    gruntHelper.init(pkg, grunt)

    .scopedclosurerevisionTask(null, "src/*.js", "dist/ziggeo.js", {
        "base": "global:BetaJS",
        "module": "global:ZiggeoSdk"
    }, null, true);

    grunt.initConfig(gruntHelper.config);

    grunt.registerTask('default', ['scopedclosurerevision']);

};