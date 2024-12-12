import { Link } from "react-router-dom";
import { ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import CartItem from "./CartItem";
import { useEffect } from "react";

// import CartItem from "../components/CartItem";
// import { SidebarContext } from "../contexts/SidebarContext";
// import { CartContext } from "../contexts/CartContext";

const Sidebar = ({ isOpen, handleClose }) => {
  const { cart, totalCount, totalPrice, dispatch } = useCart();

  useEffect(() => {
    function watchClick(e) {
      if (isOpen && !e.target.closest("[class*=sidebar]")) {
        handleClose();
        console.log("CLOSE");
      }
    }

    if (isOpen) {
      window.addEventListener("click", watchClick);
    }

    return () => {
      window.removeEventListener("click", watchClick);
    };
  }, [isOpen, handleClose]);

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } flex pb-10 flex-col sidebar w-full bg-white fixed top-0 h-full shadow-2xl md:w-[48vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-9"`}
    >
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>
          {/* Cart ({itemAmount}) */}
          Cart ({totalCount})
        </div>
        <div
          // onClick={handleClose}
          className='cursor-poniter w-8 h-8 flex justify-center items-center'
        >
          {/* <IoMdArrowForward className='text-2xl' /> */}
          <ArrowRight
            className='text-2xl cursor-pointer'
            onClick={handleClose}
          />
        </div>
      </div>
      <div className='flex grow flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b'>
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
          // return <div key={index}>{"item"}</div>;
        })}
      </div>
      <div className='flex flex-col gap-y-3  mt-4'>
        <div className='flex w-full justify-between items-center'>
          {/* total */}
          <div className='font-semibold'>
            <span className='mr-2'>Subtotal:</span> $ {totalPrice.toFixed(2)}
          </div>
          {/* clear cart icon */}
          <div
            // onClick={clearCart}
            className='cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl'
          >
            <Trash2 onClick={() => dispatch({ type: "CLEAR_CART" })} />
          </div>
        </div>
        <Link
          to={"/"}
          className='bg-gray-200 flex p-3 justify-center items-center text-primary w-full font-medium'
        >
          View Cart
        </Link>
        <Link
          to={"/"}
          className='bg-primary flex p-3 justify-center items-center text-white w-full font-medium'
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
