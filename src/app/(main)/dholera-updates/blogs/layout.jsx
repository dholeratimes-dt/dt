import BlogEventPopup from "./BlogEventPopup";

export default function BlogsLayout({ children }) {
  return (
    <>
      {children}
      <BlogEventPopup />
    </>
  );
}
