const themeColor = "#f00";

const defaultPosterConfig = {
  width: 690,
  height: 1008,
  backgroundColor: "#fff",
  pixelRatio: 1,
  debug: true,
  blocks: [
    {
      x: 10,
      y: 10,
      width: 670,
      height: 988,
      borderWidth: 20,
      borderColor: themeColor
    }
  ],
  texts: [
    {
      x: 163,
      y: 61,
      text: "raphael dos clgano",
      fontSize: 26,
      opacity: 1,
      baseLine: "top"
    },
    {
      x: 168,
      y: 103,
      text: "邀你一起参加",
      fontSize: 28,
      color: themeColor,
      opacity: 1,
      baseLine: "top"
    },
    {
      x: 56,
      y: 547,
      width: 560,
      lineNum: 2,
      lineHeight: 60,
      fontWeight: 600,
      text: "穆夏：欧洲新艺术运动先锋展览活动",
      fontSize: 40,
      color: "#353535",
      opacity: 1,
      baseLine: "top"
    },
    {
      x: 56,
      y: 687,
      text: "免费",
      fontSize: 36,
      color: themeColor,
      opacity: 1,
      baseLine: "top"
    },
    {
      x: 196,
      y: 860,
      text: "长按小程序码",
      fontSize: 24,
      color: "#666666",
      opacity: 1,
      baseLine: "top"
    },
    {
      x: 196,
      y: 890,
      text: "进入重庆文博参加活动",
      fontSize: 24,
      color: "#666666",
      opacity: 1,
      baseLine: "top"
    }
  ],
  images: [
    {
      url:
        "https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png",
      width: 80,
      height: 80,
      y: 56,
      x: 63,
      borderRadius: 80,
      borderWidth: 10,
      borderColor: themeColor
    },
    {
      url:
        "https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png",
      width: 600,
      height: 337,
      y: 180,
      x: 45
    },
    {
      url:
        "https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png",
      width: 120,
      height: 120,
      y: 832,
      x: 56,
      borderRadius: 120
    }
  ],
  lines: [
    {
      startY: 795,
      startX: 56,
      endX: 634,
      endY: 795,
      width: 3,
      color: themeColor
    }
  ]
};

export { defaultPosterConfig };
