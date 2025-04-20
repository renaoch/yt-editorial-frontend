export const playNotificationSound = () => {
  const audio = new Audio("/sounds/notify.mp3");
  audio.play().catch((e) => console.warn("Sound play failed", e));
};
