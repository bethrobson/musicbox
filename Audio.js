var Audio = {
	convolver: undefined,
	bufferList: undefined,
	loopRate: 4000,
	audioContext: new (window.AudioContext || 
	                   window.webkitAudioContext)(),

	init: function(bufferList) {
		this.bufferList = bufferList;
		var last = bufferList.length - 1;
		this.convolver = this.audioContext.createConvolver();
		this.convolver.buffer = this.bufferList[last];
		var gainNode = this.audioContext.createGain();
		gainNode.gain.value = 10;
		this.convolver.connect(gainNode);
		gainNode.connect(this.audioContext.destination);

	},

	play: function(i) {
		var sound = this.audioContext.createBufferSource();
		sound.connect(this.convolver);
		sound.buffer = this.bufferList[i];
		sound.start(0);
	}
}
