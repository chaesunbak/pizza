export default function Letter({
  char,
  rotate,
  color,
}: {
  char: string;
  rotate: number;
  color: string;
}) {
  const style = {
    color: color,
    transform: `rotate(${rotate}deg)`,
    textShadow: `
      0 2px 0 #bebebe, 0 4px 0 #b1b1b1, 0 6px 0 #a4a4a4, 
      0 8px 0 #979797, 0 10px 0 #8a8a8a, 0 12px 10px rgba(0,0,0,.2), 
      0 15px 15px rgba(0,0,0,.15)
    `,
  };

  return (
    <span
      className="inline-block transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
      style={style}
    >
      {char}
    </span>
  );
}
