import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-sky-500 text-white py-20 px-4 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-bold text-lg">Platform</h3>
          <ul>
            <li><Link href="">How does it work?</Link></li>
            <li><Link href="">Sell on Stuvia</Link></li>
            <li><Link href="">Tips to sell more</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg">Company</h3>
          <ul>
            <li><Link href="">About</Link></li>
            <li><button className="bg-white text-sky-500 px-4 py-1 rounded-2xl   mt-2">Follow us on Instagram</button></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg">Copyright</h3>
          <ul>
            <li><Link href="">Copyright Center</Link></li>
            <li><Link href="">Code of Honor</Link></li>
            <li><Link href="">Community Guidelines</Link></li>
            <li><Link href="">Notice & Takedown</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg">Need help?</h3>
          <ul>
            <li>We're available through e-mail, live chat, and Facebook.</li>
            <li><Link href="">FAQ</Link></li>
            <li><Link href="">Questions? Leave a message!</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 border-t border-white pt-6">
        <h3 className="font-bold text-lg">Useful Links</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <li><Link href="">New Notes</Link></li>
          <li><Link href="">Partners</Link></li>
          <li><Link href="">New Reviews</Link></li>
          <li><Link href="">Standardized Tests</Link></li>
        </ul>
      </div>

      <div className="max-w-6xl mx-auto mt-6 border-t border-white pt-6">
        <h3 className="font-bold text-lg">Knowledge Base</h3>
        <ul className="grid grid-cols-1 gap-2">
          <li><Link href="">How to write a good summary?</Link></li>
          <li><Link href="">How to write a convincing cover letter</Link></li>
          <li><Link href="">When is the best time to study?</Link></li>
          <li><Link href="">How to earn money with taking notes in college</Link></li>
          <li><Link href="">How to make good notes during class</Link></li>
          <li><Link href="">How to give a good presentation</Link></li>
          <li><Link href="">How to prepare your presentation</Link></li>
          <li><Link href="">How to make the best of an internship</Link></li>
          <li><Link href="">Preparing an internship interview</Link></li>
          <li><Link href="">How to write a good resume</Link></li>
        </ul>
      </div>

      <div className="max-w-6xl mx-auto mt-8 border-t border-white pt-4 text-sm text-center">
        <p>Copyright &copy; IHI International BV 2010-2025 - Company Registration Number: 61965243 - <Link href="">Terms of Use</Link> - <Link href="">Privacy Statement</Link></p>
        <p>IHI is not sponsored or endorsed by any college or university.</p>
      </div>
    </footer>
  );
}