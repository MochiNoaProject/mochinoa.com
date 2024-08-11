const voiceList = [
  { src: "/mesugaki/title.mp3", text: "タイトルコール" },
  { src: "/mesugaki/がんばれがんばれ.mp3", text: "がんばれがんばれ" },
  { src: "/mesugaki/ざあこ.mp3", text: "ざあこ" },
  { src: "/mesugaki/ざあこざあこ.mp3", text: "ざあこざあこ" },
  { src: "/mesugaki/すっごーい.mp3", text: "すっごーい" },
  { src: "/mesugaki/ちっさ.mp3", text: "ちっさ" },
  { src: "/mesugaki/でっか.mp3", text: "でっか" },
  { src: "/mesugaki/なっさけない.mp3", text: "なっさけない" },
] as const;

type VoiceText = (typeof voiceList)[number]["text"];

const audio = new Audio();

export const playVoice = (text: VoiceText) => {
  audio.src = voiceList.find((voice) => voice.text === text)?.src ?? "";

  void audio.play();

  return audio;
};
