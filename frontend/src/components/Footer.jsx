export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex justify-between">
        <span>© {new Date().getFullYear()} ShareOCar</span>
        <span>Safety • Trust • Community</span>
      </div>
    </footer>
  );
}
