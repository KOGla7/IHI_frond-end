import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from 'next/link';

// Footer Component
function Footer() {
  return (
    <footer className="bg-sky-500 text-white py-20 px-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="absolute h-[1030px] w-[1030px] bg-opacity-85 ml-[450px] mt-[-200px]" style={{ backgroundImage: "url('')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

        <div>
          <h3 className="font-bold text-lg">Platform</h3>
          <ul>
            <li><Link href="">How does it work?</Link></li>
            <li><Link href="">Sell on IHI</Link></li>
            <li><Link href="">Tips to sell more</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg">Company</h3>
          <ul>
            <li><Link href="">About</Link></li>
            <li><button className="bg-white text-sky-500 px-4 py-1 rounded-2xl mt-2">Follow us on Instagram</button></li>
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

      <div className="mt-6 border-t border-white pt-6">
        <h3 className="font-bold text-lg">Useful Links</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <li><Link href="">New Notes</Link></li>
          <li><Link href="">Partners</Link></li>
          <li><Link href="">New Reviews</Link></li>
          <li><Link href="">Standardized Tests</Link></li>
        </ul>
      </div>

      <div className="mt-6 border-t border-white pt-6">
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

      <div className="mt-8 border-t border-white pt-4 text-sm text-center">
        <p>Copyright &copy; IHI International BV 2010-2025 - Company Registration Number: 61965243 - <Link href="">Terms of Use</Link> - <Link href="">Privacy Statement</Link></p>
        <p>IHI is not sponsored or endorsed by any college or university.</p>
      </div>
    </footer>
  );
}

// Dashboard Component
export default function Dashboard() {
  const router = useRouter();
  const user = router.query.user ? JSON.parse(router.query.user) : null;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    category_id: "",
    price: "",
    description: "",
    user_id: user?.id || "",
  });

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
    fetchCategories();
  },[]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProducts = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:8000/myProducts/${user.id}`);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div className="h-full bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <h1 className="text-xl font-bold text-slate-700">IHI</h1>
          <input
            type="text"
            placeholder="Search for courses, books, exams, or assignments"
            className="border border-sky-500 p-2 rounded-lg w-1/2 text-gray-500"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Sell</button>
        </header>

        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="col-span-2 bg-white p-4 rounded-lg shadow">
            <h2 className="text-3xl text-slate-700">Hi <span className="text-sky-600 text-2xl font-bold">example@gmail.com</span></h2>
            <p className="text-black">Looking for the best summaries? Buy them today!</p>

            <div className="flex justify-between mt-4">
              <div>
                <p className="text-gray-600">Documents for you</p>
                <p className="text-lg font-bold text-gray-500">0</p>
              </div>
              <div>
                <p className="text-gray-600">Courses for you</p>
                <p className="text-lg font-bold text-gray-500">2</p>
              </div>
              <div>
                <p className="text-gray-600">Your IHI credit</p>
                <p className="text-lg font-bold text-gray-500">$0.00</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-slate-700">Your shopping cart</h3>
            <p className="text-slate-500">You currently have <span className="font-bold">0 items</span> in your shopping cart</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="col-span-2 bg-white p-4 rounded-lg shadow text-black">
            <h3 className="text-lg font-semibold text-slate-700">Interesting for you</h3>
            <p className="text-slate-500">Find the perfect summaries and other documents, recommended for you</p>

            <div className="grid grid-cols-3 gap-4 mt-4 text-lg font-bold">
              <div className="p-4 rounded-lg border border-sky-500 text-sky-500">Medicine</div>
              <div className="p-4 rounded-lg border border-sky-500 text-sky-500">Research Methods for Business</div>
              <div className="p-4 rounded-lg border border-sky-500 text-sky-500">Personal and Professional Effectiveness</div>
              <div className="p-4 rounded-lg border border-sky-500 text-sky-500">Becoming a Master Manager</div>
              <div className="p-4 rounded-lg border border-sky-500 text-sky-500">The Globalization Paradox</div>
              <div className="p-4 rounded-lg border border-sky-500 text-sky-500">Chemistry</div>
            </div>
          </div>

          <div className="space-y-4 text-black">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-slate-700">Last viewed</h3>
              <p className="text-slate-500">Want to view your latest viewed documents again?</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow text-black">
              <h3 className="text-lg font-semibold text-slate-700">Recommended by others</h3>
              <p className="text-slate-500">Find summaries that were recommended by others</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-slate-700">My Downloads</h3>
              <p className="text-slate-500">Overview of all the documents and flashcards you've purchased</p>
            </div>
          </div>
        </div>

        {/* Footer Component */}
        <Footer />
      </div>
    </div>
  );
}

