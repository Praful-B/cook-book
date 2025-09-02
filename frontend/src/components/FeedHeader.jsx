const logoUrl = "../assets/logo.svg";

export default function FeedHeader() {
  return (
    <header>
      <span className="flex items-center justify-center gap-1.5">
        <img src={logoUrl} alt="logo-img" />
        <span>
          <h1 className="font-medium">Cook-Book</h1>
        </span>
      </span>
    </header>
  );
}
