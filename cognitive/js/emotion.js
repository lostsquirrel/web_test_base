var pic_real_width, pic_real_height;
$(document).ready(function() {

    var api = "/api/cognitive"
    var sks = ["anger", "contempt", "disgust", "fear", "happiness", "neutral", "sadness", "surprise"];
    $('#url, #file').on('change', function(e){

        $('#msg').hide();

        var formData = new FormData($('form')[0]);

        var ti = $('#url').val();
        var file = $('#file').val();
        var x = $(event.target).attr('id');
        console.debug(x)
        console.debug(formData)
        console.debug('------')
        var url;
        if (x == 'url') {
            url = api + "/pic"

            disPlayImage(ti, function(){
                submitForm(formData, url, function(data){

                    showResult(data)
                });
            })
            // console.log(pic_real_width)
            // $.post(url, {url: ti}, , 'json');

        } if (x == 'file'){
            url = api + "/upload/"
            submitForm(formData, url, function(data){
                 $('#imgSource').attr('src', data.url);
                 disPlayImage(data.url, function(){
                     showResult(data.data)
                 })

            });
        } else {
            $('#msg').html('请填写图片地址或上传一张照片').show()
        }

    });

    function submitForm(formData, url, callback) {
        $.ajax({
            type:'POST',
            url: url,
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success: callback,
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
    }

    function disPlayImage(imageUrl, callback) {
        $('#imgSource').attr('src', imageUrl);
        var img = document.getElementById("imgSource");

        var mimage = $("<img src=\"" + imageUrl + "\"/>") // Make in memory copy of image to avoid css issues
            .on('load', function() {
                pic_real_width = this.width;   // Note: $(this).width() will not
                pic_real_height = this.height; // work for in memory images.
                // console.log($(this))
                // 如果图片宽度大于 680 等比缩放至 680
                if (pic_real_width > 680) {
                    pic_real_width = 680;
                    pic_real_height = pic_real_height / (pic_real_width / 680)
                }
                console.log(pic_real_width)
                console.log(pic_real_height)
                callback()
            });

    }

    function showResult(data) {

            var c = document.getElementById("imgDisplay");
            var ctx = c.getContext("2d");


            $('#imgDisplay').attr("width", pic_real_width)
            $('#imgDisplay').attr("height", pic_real_height)
            var img = document.getElementById("imgSource");
            console.log(img)
            console.log(pic_real_width)
            console.log(pic_real_height)
            ctx.drawImage(img, 10, 10);

            var mqs = '';
            var scores = '';
            $(data).each(function(k, item) {
                mqs += '<p>'+item.result+'</p>';
                scores += '<div class="row">';
                $(sks).each(function(k, v){
                    scores += '<div class="progress">';
                    score = item.scores[v] * 100
                    scores += '<div class="progress-bar" role="progressbar" aria-valuenow="'+score+'" aria-valuemin="0" aria-valuemax="100" style="width:'+score+'%">'
                    scores += v + '&nbsp;&nbsp' + score + '%'
                    scores += '</div>'
                    scores += '</div>'

                    scores +='<div class="w-100"></div>';
                });
                scores += '</div>'
                var faceRectangle = item.faceRectangle;
                // console.log(item)
                ctx.beginPath();
                ctx.rect(faceRectangle.left, faceRectangle.top, faceRectangle.width, faceRectangle.height);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'red';
                ctx.stroke();
            });
            if (!data || data.length == 0) {
                mqs = "未能识别"
            }
            $('div.mqs').html(mqs)
            $('#scores_grid').html(scores)
            //   context.fillStyle = 'red';
            //   context.fill();

    }
});
