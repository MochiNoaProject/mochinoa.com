export const voiceMap = {
	タイトルコール: { src: "/mesugaki/title.mp3" },
	がんばれがんばれ: { src: "/mesugaki/がんばれがんばれ.mp3" },
	ざあこ: { src: "/mesugaki/ざあこ.mp3" },
	ざあこざあこ: { src: "/mesugaki/ざあこざあこ.mp3" },
	すっごーい: { src: "/mesugaki/すっごーい.mp3" },
	ちっさ: { src: "/mesugaki/ちっさ.mp3" },
	でっか: { src: "/mesugaki/でっか.mp3" },
	なっさけない: { src: "/mesugaki/なっさけない.mp3" },
};

export type VoiceText = keyof typeof voiceMap;

export const playVoice = (audio: HTMLAudioElement | null, text: VoiceText) => {
	if (!audio) {
		return;
	}
	audio.src = voiceMap[text].src;

	void audio.play();
};
