jQuery( document ).ready(function() {
    // console.log( "signature ready!" );
    $x = 1;
    jQuery('.digi_signature_class').each( function(){
        //if($x == 1){
            var signature_name = jQuery(this).find(".signature-pad").attr("name");
            var gfds_id = jQuery(this).find(".signature-pad").attr("gfds_id");
            var signature_backcolor = jQuery(this).find(".signature-pad").attr("pad_back_color");
            var signature_penColor = jQuery(this).find(".signature-pad").attr("pad_pen_color");
            var signature_penColor = jQuery(this).find(".signature-pad").attr("pad_pen_color");
            var pad_pen_width = jQuery(this).find(".signature-pad").attr("pad_pen_width");
            // console.log(pad_pen_width);

            // var canvas = document.querySelector("canvas");
            var signature_pad = new SignaturePad(document.getElementById('gfds_signature_'+gfds_id), {
                backgroundColor: signature_backcolor,
                penColor: signature_penColor,
                maxWidth: pad_pen_width
            });

            jQuery(document).on('touchstart touchend click', "#gfds_signature_"+gfds_id, function(event){
                if(event.handled === false) return
                event.stopPropagation();
                event.preventDefault();
                event.handled = true;
                var signature_imgdata = signature_pad.toDataURL('image/png');
                jQuery("input[name="+signature_name+"]").val(signature_imgdata);
            });

            jQuery(".clearButton").click(function(){
                signature_pad.clear();
                jQuery("input[name="+signature_name+"]").val("");
            });
       /* } else {
            jQuery(this).html("<p>Multiple Signaturepad is Valid in pro version of digital signature for gravity forms <a href='https://www.topsmodule.com/product/digital-signature-for-gravity-forms/' target='_blank'>Click here Get Pro Version</a></p>");
        }*/
        $x++;
    });
});