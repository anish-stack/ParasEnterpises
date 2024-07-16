import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';
import Loader from './components/Loader/Loader';
import { Toaster } from 'react-hot-toast';
import AOS from "aos";
import "aos/dist/aos.css";
import MetaHelmet from './components/Meta/Helmet';
import ThankYou from './pages/Thankyou/Thankyou';
import NewsSection from './pages/News/News';
import SingleNews from './pages/News/SingleNews';

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgetPasswords = lazy(() => import('./pages/Auth/ForgetPasswords'));
const SingleProduct = lazy(() => import('./pages/SingleProduct/SingleProduct'));
const Shop = lazy(() => import('./pages/Shop/Shop'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Certification = lazy(() => import('./components/Certification/Certification'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Offers = lazy(() => import('./pages/Offer/Offers'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const PaymentSuccess = lazy(() => import('./pages/Checkout/PaymentSuccess'));
const PrivacyPolicyPage = lazy(() => import('./pages/Policy/PrivacyPolicyPage'));
const TermsAndConditionsPage = lazy(() => import('./pages/Policy/TermsAndConditionsPage'));
const RefundPolicyPage = lazy(() => import('./pages/Policy/RefundPolicyPage'));
const ShippingPolicyPage = lazy(() => import('./pages/Policy/ShippingPolicyPage'));
const ErrorPage = lazy(() => import('./components/Error/ErrorPage'));

function App() {
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoader(false);
    }, 1900); // Set a timeout for 1 second to simulate loading time
    return () => clearTimeout(timeout); // Clear the timeout on unmount
  }, [window.location.pathname]);

  const routesConfig = [
    {
      path: "/",
      component: Home,
      meta: {
        title: "Home - Paras Enterprises",
        description: "Welcome to Paras Enterprises. Discover our range of products and offers.",
        keywords: "Paras Enterprises, home, products, offers"
      }
    },
    {
      path: "/about",
      component: About,
      meta: {
        title: "About Us - Paras Enterprises",
        description: "Learn more about Paras Enterprises and our mission.",
        keywords: "Paras Enterprises, about, mission, company"
      }
    },
    {
      path: "/login",
      component: Login,
      meta: {
        title: "Login - Paras Enterprises",
        description: "Login to your account at Paras Enterprises.",
        keywords: "Paras Enterprises, login, account"
      }
    },
    {
      path: "/register",
      component: Register,
      meta: {
        title: "Register - Paras Enterprises",
        description: "Create a new account at Paras Enterprises.",
        keywords: "Paras Enterprises, register, account"
      }
    },
    {
      path: "/Forget-Password",
      component: ForgetPasswords,
      meta: {
        title: "Forget Password - Paras Enterprises",
        description: "Recover your password at Paras Enterprises.",
        keywords: "Paras Enterprises, forget password, recover"
      }
    },
    {
      path: "/Single-Product",
      component: SingleProduct,
      meta: {
        title: "Product Details - Paras Enterprises",
        description: "Detailed view of a product at Paras Enterprises.",
        keywords: "Paras Enterprises, product, details"
      }
    },
    {
      path: "/Shop",
      component: Shop,
      meta: {
        title: "Shop - Paras Enterprises",
        description: "Shop the latest products at Paras Enterprises.",
        keywords: "Paras Enterprises, shop, products"
      }
    },
    {
      path: "/Cart",
      component: Cart,
      meta: {
        title: "Cart - Paras Enterprises",
        description: "View and manage your cart at Paras Enterprises.",
        keywords: "Paras Enterprises, cart, shopping"
      }
    },
    {
      path: "/Offers",
      component: Offers,
      meta: {
        title: "Offers Available At Paras Enterprises",
        description: "Discover amazing deals and special offers at Paras Enterprises. Shop now and enjoy discounts on a wide range of products, including electronics, home appliances, clothing, and more. Hurry, these offers are available for a limited time only!",
        keywords: "Paras Enterprises, special offers, discounts, deals, electronics, home appliances, clothing, shopping, sales, limited time offers"
      }
    },
    {
      path: "/Checkout",
      component: Checkout,
      meta: {
        title: "Checkout - Paras Enterprises",
        description: "Proceed to checkout at Paras Enterprises.",
        keywords: "Paras Enterprises, checkout, payment"
      }
    },
    {
      path: "/Payment-Success",
      component: PaymentSuccess,
      meta: {
        title: "Payment Success - Paras Enterprises",
        description: "Your payment was successful at Paras Enterprises.",
        keywords: "Paras Enterprises, payment, success"
      }
    },
    {
      path: "/Privacy-Policy",
      component: PrivacyPolicyPage,
      meta: {
        title: "Privacy Policy - Paras Enterprises",
        description: "Read the privacy policy of Paras Enterprises.",
        keywords: "Paras Enterprises, privacy policy"
      }
    },
    {
      path: "/Terms-And-Conditions",
      component: TermsAndConditionsPage,
      meta: {
        title: "Terms and Conditions - Paras Enterprises",
        description: "Read the terms and conditions of Paras Enterprises.",
        keywords: "Paras Enterprises, terms and conditions"
      }
    },
    {
      path: "/Refund-Policy",
      component: RefundPolicyPage,
      meta: {
        title: "Refund Policy - Paras Enterprises",
        description: "Read the refund policy of Paras Enterprises.",
        keywords: "Paras Enterprises, refund policy"
      }
    },
    {
      path: "/Shipping-Policy",
      component: ShippingPolicyPage,
      meta: {
        title: "Shipping Policy - Paras Enterprises",
        description: "Read the shipping policy of Paras Enterprises.",
        keywords: "Paras Enterprises, shipping policy"
      }
    },
    {
      path: "/Contact",
      component: Contact,
      meta: {
        title: "Contact Us - Paras Enterprises",
        description: "Get in touch with us at Paras Enterprises.",
        keywords: "Paras Enterprises, contact, support"
      }
    },
    {
      path: "/thank-you",
      component: ThankYou,
      meta: {
        title: "Thankyou For Contacting - Paras Enterprises",
        description: "Get in touch with us at Paras Enterprises.",
        keywords: "Paras Enterprises, contact, support"
      }
    },
    {
      path: "/news",
      component: NewsSection,
      meta: {
        title: "Latest News - Paras Enterprises",
        description: "Stay updated with the latest news and updates from Paras Enterprises.",
        keywords: "Paras Enterprises, news, updates, latest news"
      }
    },
    {
      path: "/Single-News",
      component: SingleNews,
      meta: {
        title: "Latest News - Paras Enterprises",
        description: "Stay updated with the latest news and updates from Paras Enterprises.",
        keywords: "Paras Enterprises, news, updates, latest news"
      }
    },
    {
      path: "/certifications",
      component: () => (
        <>

          <Certification />
          <Contact />
        </>
      ),
      meta: {
        title: "Certifications - Paras Enterprises",
        description: "Explore the certifications and accreditations achieved by Paras Enterprises.",
        keywords: "Paras Enterprises, certifications, accreditations"
      }
    }
    ,
    {
      path: "/*",
      component: ErrorPage,
      meta: {
        title: "404 - Page Not Found",
        description: "The page you are looking for does not exist.",
        keywords: "404, page not found, error"
      }
    }
  ];

  return (
    <BrowserRouter>
      {isLoader ? (
        <Loader /> // Show loader if isLoader is true
      ) : (
        <>
          <Header />
          <Suspense fallback={<Loader />}>
            <Routes>
              {routesConfig.map(({ path, component: Component, meta }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <>
                      <MetaHelmet
                        Title={meta.title}
                        Descriptions={meta.description}
                        keywords={meta.keywords}
                      />
                      <Component />
                    </>
                  }
                />
              ))}
            </Routes>
          </Suspense>
          <Footer />
        </>
      )}
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
