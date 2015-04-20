var fs = require('fs'),
    phantom = require('phantom'),
    Twit = require('twit'),
    CronJob = require('cron').CronJob;

var T = new Twit({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token: access_token,
  access_token_secret: access_token_secret
});

new CronJob('00 19 * * *', function() {
  phantom.create(function(ph) {
    ph.createPage(function(page) {
      page.set("viewportSize", {
        width: 1280,
        height: 768
      });
      page.set("paperSize", {
        format: "A4",
        orientation: "portrait",
        margin: "1cm"
      });
      page.open("http://www.theguardian.com/politics/ng-interactive/2015/feb/27/guardian-poll-projection/", function(status) {
        setTimeout(function(){
          page.evaluate(function() {
            return document.getElementById('pollchart').getBoundingClientRect();
          }, function(result) {
            page.set('clipRect', {
              top: result.top,
              left: result.left,
              width: result.width,
              height: result.height
            });
            page.render('out.png', function() {
              ph.exit();
              var b64content = fs.readFileSync('out.png', {
                  encoding: 'base64'
              });
              T.post('media/upload', {
                media: b64content
              }, function(err, data, response) {
              var mediaIdStr = data.media_id_string,
                params = {
                  status: 'The Guardian poll of polls — ' + new Date().toLocaleDateString('uk'),
                  media_ids: [mediaIdStr]
                };
                T.post('statuses/update', params);
              });
            });
          });
        }, 5000);
      });
    });
  });
}, null, true, 'Europe/London');
