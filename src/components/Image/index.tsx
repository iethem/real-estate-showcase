export default function Image({ src, ...rest }: any) {
  return <img src={src} {...rest} />;
}
