window.onload = function() {

	var bufferLoader = new BufferLoader(
		Audio.audioContext,
		[
			'C4.wav',
			'D4.wav',
			'E4.wav',
			'G4.wav',
			'A4.wav',
			'C5.wav',
			'D5.wav',
			'E5.wav',
			'G5.wav',
			'A5.wav',
			"ir.mp3"
		],
		finishedLoading
	);
  	bufferLoader.load();

	function finishedLoading(bufferList) {
		Audio.init(bufferList);

		var canvas = document.getElementById('canvas');
		var view = new View(canvas);

		canvas.addEventListener("mousedown", view.handleClick.bind(view), false);
		setInterval(view.updateDisplay.bind(view), view.frameRate);
	}

}

