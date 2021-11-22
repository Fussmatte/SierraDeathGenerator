function makeGIF(context){
	var encoder = new GIFEncoder()
	encoder.setRepeat(0)
	encoder.start()
	var source = $('textarea#sourcetext')

	for(var i=1;i<6;i++){
		if(i==5){
			encoder.setDelay(2000)
		}else{
			encoder.setDelay(1000)
		}
		$('#overlay-frame').val('frame_'+i)
		renderText(false)
		encoder.addFrame(context)
	}
	/* Twitter MP4 Fix:
	   Twitter drops the last frame of MP4 files, so on desktop these will loop too fast.
	   We don't just show the last frame twice with full length, because mobile does 
	   NOT drop the last frame, and therefore the last frame delay would be twice as long 
	   there. This gives us a very tiny difference between mobile and desktop, which should 
	   be fine. */
	encoder.setDelay(20)
	encoder.addFrame(context)

	encoder.finish()
	return URL.createObjectURL(new Blob([new Uint8Array(encoder.stream().bin)], {type : "image/gif" } ))
}