//sound.js

if (AudioFX.supported) {
  var shufflesound = AudioFX('sounds/cardshuffle', { formats: ['wav'], pool:2 });
  var cardsound = AudioFX('sounds/cardsound', { formats: ['wav'], pool:5 });
  var doublecardsound = AudioFX('sounds/cardsound2', { formats: ['wav'], pool:5 });
}
