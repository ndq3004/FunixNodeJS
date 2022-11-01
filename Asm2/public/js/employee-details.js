$(document).ready(function() {
    var state = $('#formMode').val();
    var form = $('#formDetails');
    var imgBase64 = $('#avatarBase64');
    var inputBase64Hidden = $('#avatar')

    if(state == 'view'){
        let controls = form.find('.form-control');
        for(let ct of controls){
            ct.disabled = true
        }
    }

    setImageSrc(inputBase64Hidden.val())

    $('#formDetails').submit(function(e){
        let controls = form.find('.form-control');
        for(let ct of controls){
            ct.disabled = false
        }
    })


    $('#avatarInput').on('change', function(event){
        let file = event.currentTarget.files[0];
        let render = new FileReader();

        render.onloadend = function(){
            let src = render.result;
            setImageSrc(src);
            inputBase64Hidden.val(src)
            
        }

        render.readAsDataURL(file);
    })

    function setImageSrc(src){
        imgBase64.attr('src', src)
        if(src){
            imgBase64.show();
        }else{
            imgBase64.hide();
        }
    }
} );