import { useCompletion } from "@ai-sdk/vue";
import type { Style } from "~/types";

export const useAsciiArt = () => {
  // 风格选项
  const styles = useState<Style[]>("styles", () => [
    {
      id: 1,
      name: "可爱萌宠",
      description: "充满治愈感的小动物风格 (=｀ω´=)",
      icon: "🐱",
    },
    {
      id: 2,
      name: "极客终端",
      description: "黑客帝国风格的终端界面 ⌨️",
      icon: "💻",
    },
    {
      id: 3,
      name: "动感活力",
      description: "充满运动感的动作表现 ⚡",
      icon: "🏃",
    },
    {
      id: 4,
      name: "梦幻童话",
      description: "童话故事般的奇幻风格 ✨",
      icon: "🌟",
    },
  ]);

  const inputText = useState<string>("inputText", () => "");
  const selectedStyle = useState<Style>("selectedStyle", () => styles.value[0]);
  const sceneText = useState<string>("sceneText", () => "");

  // 初始化 AI 聊天，使用流式输出
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/chat",
    onError: (error) => {
      console.error("生成错误:", error);
      alert("生成失败，请重试");
    },
  });

  // 添加处理函数
  const normalizeAsciiArt = (text: string): string => {
    const lines = text.split("\n");
    if (lines.length < 4) return text;

    // 找出最长行的长度
    const maxLength = Math.max(...lines.map((line) => line.length));

    // 处理每一行
    return lines
      .map((line, index) => {
        // 跳过空行
        if (!line.trim()) return line;

        // 如果是边框行（第1、2、3行）
        if (index <= 2) {
          // 确保边框字符正确
          if (index === 0) return `╔${"═".repeat(maxLength - 2)}╗`;
          if (index === 2) return `╚${"═".repeat(maxLength - 2)}╝`;

          // 处理文本行
          const content = line.trim().replace(/[║│|]/g, "").trim();
          const padding = Math.floor((maxLength - content.length - 2) / 2);
          return `║${" ".repeat(padding)}${content}${" ".repeat(
            maxLength - content.length - padding - 2
          )}║`;
        }

        // 处理表情行
        const emoji = line.trim();
        const padding = Math.floor((maxLength - emoji.length) / 2);
        return (
          " ".repeat(padding) +
          emoji +
          " ".repeat(maxLength - emoji.length - padding)
        );
      })
      .join("\n");
  };

  // 生成文本
  const generateText = async () => {
    if (!inputText.value) {
      alert("请输入要生成的文字内容 (｡•́︿•̀｡)");
      return;
    }

    if (!sceneText.value) {
      alert("请输入场景描述 (｡•́︿•̀｡)");
      return;
    }

    try {
      await complete("", {
        body: {
          style: selectedStyle.value.name,
          scene: sceneText.value,
          text: inputText.value,
        },
      });
      // 处理生成的结果
      // completion.value = normalizeAsciiArt(completion.value);
    } catch (error) {
      console.error("生成失败:", error);
    }
  };

  // 复制到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(completion.value);
      alert("复制成功啦！(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
    } catch (err) {
      alert("啊哦，复制失败了 (；′⌒`)");
    }
  };

  return {
    styles,
    inputText,
    selectedStyle,
    sceneText,
    completion,
    isLoading,
    generateText,
    copyToClipboard,
  };
};
