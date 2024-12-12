// Public/Js/helper.js
const Handlebars = require('handlebars');

Handlebars.registerHelper('getYouTubeVideoId', function(videoUrl) {
    let videoId = '';

    try {
        const url = new URL(videoUrl);
        
        // Verifica si es un enlace corto (youtu.be)
        if (url.hostname === 'youtu.be') {
            videoId = url.pathname.substring(1); // Obtiene el ID del video
        } else {
            // Verifica si es un enlace largo (youtube.com)
            videoId = url.searchParams.get("v") || url.pathname.split('/').pop();
        }
    } catch (error) {
        console.error("Error parsing video URL:", error);
    }

    return videoId;
});

const handlebars = require('handlebars');
handlebars.registerHelper('ifCond', function(v1, v2, options) {
    return (v1 === v2) ? options.fn(this) : options.inverse(this);
  });