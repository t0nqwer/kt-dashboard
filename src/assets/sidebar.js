import {
  AiOutlineBarcode,
  AiOutlineUnorderedList,
  AiFillShop,
} from "react-icons/ai";

import { GiClothes, GiRolledCloth, GiOrganigram } from "react-icons/gi";
import {
  MdDashboard,
  MdOutlineImportExport,
  MdAddShoppingCart,
  MdPlaylistAdd,
  MdOutlineDesignServices,
  MdShoppingCart,
  MdDesignServices,
} from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { BsShop } from "react-icons/bs";

export const newlinks = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    pathname: "dashboard",
    priority: 0,
  },
  {
    title: "ดีไซน์",
    icon: <MdDesignServices />,
    pathname: "design",
    priority: 0,
    subMenu: [
      {
        title: "ดูแบบเสื้อผ้า",
        icon: <MdOutlineDesignServices />,
        pathname: "design",
      },
      {
        title: "เพิ่มแบบเสื้อผ้า",
        icon: <MdPlaylistAdd />,
        pathname: "design/add",
      },
    ],
  },
  {
    title: "สินค้า",
    icon: <GiClothes />,
    pathname: "product",
    priority: 0,
    subMenu: [
      {
        title: "รายการเสื้อผ้า",
        icon: <AiOutlineUnorderedList />,
        pathname: "product/cloth",
      },

      {
        title: "รายการสินค้าอื่นๆ",
        icon: <AiOutlineUnorderedList />,
        pathname: "product/khwanta",
      },

      {
        title: "สินค้าตัวอย่าง",
        icon: <AiOutlineUnorderedList />,
        pathname: "product/example",
      },
      {
        title: "เพิ่มสินค้าเสื้อผ้า",
        icon: <MdPlaylistAdd />,
        pathname: "product/cloth/add",
      },
      {
        title: "เพิ่มสินค้าอื่นๆ",
        icon: <MdPlaylistAdd />,
        pathname: "product/khwanta/add",
      },
      {
        title: "เพิ่มสินค้าตัวอย่าง",
        icon: <MdPlaylistAdd />,
        pathname: "product/example/add",
      },
    ],
  },
  {
    title: "ผ้า",
    icon: <GiRolledCloth />,
    pathname: "fabric",
    priority: 0,
    subMenu: [
      {
        title: "รายการผ้า",
        icon: <AiOutlineUnorderedList />,
        pathname: "/fabric",
      },
      {
        title: "เพิ่มผ้า",
        icon: <MdPlaylistAdd />,
        pathname: "/fabric/add",
      },
    ],
  },
  {
    title: "การขาย",
    icon: <MdShoppingCart />,
    pathname: "sale",
    priority: 0,
    subMenu: [
      {
        title: "บิล",
        icon: <RiBillLine />,
        pathname: "/sale/bill",
      },
      {
        title: "ออเดอร์",
        icon: <AiOutlineUnorderedList />,
        pathname: "/sale/order",
      },
      {
        title: "ลูกค้า",
        icon: <AiOutlineUnorderedList />,
        pathname: "/sale/customer",
      },
      {
        title: "ร้านค้า",
        icon: <AiOutlineUnorderedList />,
        pathname: "/sale/shop",
      },
      {
        title: "โปรโมชั่น",
        icon: <MdPlaylistAdd />,
        pathname: "/sale/promotion",
      },
    ],
  },
  {
    title: "Stock",
    icon: <AiFillShop />,
    pathname: "stock",
    priority: 0,
    subMenu: [
      {
        title: "ส่งสินค้า",
        icon: <AiOutlineUnorderedList />,
        pathname: "/stock/transfer",
      },
      {
        title: "สต๊อคสินค้า",
        icon: <MdPlaylistAdd />,
        pathname: "/stock",
      },
    ],
  },
  {
    title: "Employee",
    icon: <GiOrganigram />,
    pathname: "employee",
    priority: 1,
  },
];
