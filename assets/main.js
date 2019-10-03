(function() {
	document.addEventListener('DOMContentLoaded', initModule);

	function initModule() {
		const audioNumber = Math.floor(Math.random() * 10) + 1;
		const audioFileStr = `../assets/songs/audio-${audioNumber}.mp3`;
		const audioFile = new Audio(audioFileStr);
		const toggleSwitch = document.querySelector('#toggle--knob');
		let isDataLoaded = false;

		function setDataLoadedTruthy() {
			isDataLoaded = true;
		}
		function setDataLoadedFalsy() {
			isDataLoaded = false;
		}
		function setToggleSwitchOff() {
			toggleSwitch.checked = false;
		}
		function playAudio(audio) {
			return audio
				.play()
				.then(() => console.log('Audio is playing!'))
				.catch(err => {
					console.log("AudioError: Audio won't play!", err);
				});
		}
		function handleToggleSwitchChange(e) {
			const element = e.target;
			const isChecked = !!(element && element.checked);

			if (!isChecked) {
				audioFile.pause();
				return false;
			}

			if (!isDataLoaded) {
				window.alert('Music is not loaded properly. Please try again later.');
				element.checked = false;
				return false;
			}

			playAudio(audioFile);
		}

		audioFile.addEventListener('loadeddata', setDataLoadedTruthy, false);
		audioFile.addEventListener('stalled', setDataLoadedFalsy, false);
		// audioFile.addEventListener('suspend', setDataLoadedFalsy, false);
		audioFile.addEventListener('error', setDataLoadedFalsy, false);
		audioFile.addEventListener('ended', setToggleSwitchOff, false);
		toggleSwitch.addEventListener('change', handleToggleSwitchChange, false);
	}
})();
