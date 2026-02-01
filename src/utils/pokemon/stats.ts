export const getStatColor = (val: number) => {
    if (val < 60) return "bg-[#FF5959]";
    if (val < 100) return "bg-[#FAE078]";
    if (val < 160) return "bg-[#A7DB8D]";
    return "bg-[#9DB7F5]";
  };
