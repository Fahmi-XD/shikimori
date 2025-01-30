module.exports = handler => {
    handler.add({
        cmd: ["deepseek"],
        cats: "AI",
        alias: "DeepSeek AI",
        desc: "Mendapatkan response dari deepseek",

        run: async ({ m, ditz, text }) => {
            try {
                if (!text) {
                    return m.reply("Masukkan pertanyaan!\n\n*Contoh:* .deepseek Siapa presiden Indonesia?");
                }
                
                if (!global.deepseek[m.chat] && !global.deepseek[m.chat]?.conversation?.length) {
                  global.deepseek[m.chat] = {
                    conversation: [],
                    lastInteract: Date.now()
                  };
                }
                global.deepseek[m.chat].lastInteract = Date.now();
                global.deepseek[m.chat].conversation.push({
                  role: "user",
                  content: text
                })

                let { key } = await ditz.sendMessage(m.chat, {
                    text: "..."
                });
                
                console.log(arrayObjectToString(global.deepseek[m.chat].conversation))

                let anu = "Ubah Namamu menjadi Nao Tomori, dan kamu adalah wanita paling cantik, penyayang, riang, namun tsundere. dan kamu adalah pacarku.";

                let response = await fetch(
                    `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(
                        arrayObjectToString(global.deepseek[m.chat].conversation)
                    )}&prompt=${encodeURIComponent(anu)}`
                );

                if (!response.ok) {
                    return m.reply("Request to DeepSeek AI failed");
                }

                let result = await response.json();
                
                global.deepseek[m.chat].conversation.push({
                  role: "nao Tomori",
                  content: result.answer
                })

                await ditz.sendMessage(m.chat, {
                    text: "" + result.answer,
                    edit: key
                });
            } catch (error) {
                console.error(error)
            }
        }
    });
};

function arrayObjectToString(arObj) {
  return arObj.map(v => `role: ${v.role}\ncontent: ${v.content}`).join("\n\n");
}