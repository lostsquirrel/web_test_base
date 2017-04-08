$(document).ready(function() {

    var api = "/api/cognitive"

    $('button').click(function(){
        $('#msg').hide();
        var ti = $('#url').val();
        var url = api + "/emotion"
        if (ti) {
            $('#imgSource').attr('src', ti);
            var img = document.getElementById("imgSource");
            var pic_real_width, pic_real_height;
            var mimage = $("<img src=\"" + ti+ "\"/>") // Make in memory copy of image to avoid css issues
                .on('load', function() {
                    pic_real_width = this.width;   // Note: $(this).width() will not
                    pic_real_height = this.height; // work for in memory images.
                    // console.log($(this))
                });

            // console.log(pic_real_width)
            $.post(url, {url: ti}, function(data){

                var c = document.getElementById("imgDisplay");
                var ctx = c.getContext("2d");


                $('#imgDisplay').attr("width", pic_real_width + 20)
                $('#imgDisplay').attr("height", pic_real_height + 20)
                ctx.drawImage(img, 10, 10);

                var mqs = '';
                $(data).each(function(k, item) {
                    mqs += '<marquee>'+item.result+'</marquee>';
                    var faceRectangle = item.faceRectangle;
                    // console.log(item)
                    ctx.beginPath();
                    ctx.rect(faceRectangle.left, faceRectangle.top, faceRectangle.width, faceRectangle.height);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = 'red';
                    ctx.stroke();
                });
                $('div.mqs').html(mqs)
                //   context.fillStyle = 'red';
                //   context.fill();

            }, 'json');
        } else {
            $('#msg').html('请填写图片地址').show()
        }
    });
});
