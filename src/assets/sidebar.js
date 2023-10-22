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
import { BsShop } from "react-icons/bs";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        icon: <MdDashboard />,
        pathname: "Dashboard",
      },
    ],
  },

  {
    title: "แบบเสื้อผ้า",
    links: [
      {
        name: "ดูแบบเสื้อผ้า",
        icon: <MdOutlineDesignServices />,
        pathname: "DesignList",
      },
      {
        name: "เพิ่มแบบเสื้อผ้า",
        icon: <MdPlaylistAdd />,
        pathname: "AddDesign",
      },
    ],
  },
  {
    title: "สินค้า",
    links: [
      {
        name: "รายการเสื้อผ้า",
        icon: <AiOutlineUnorderedList />,
        pathname: "ProductClothList",
      },
      {
        name: "รายการสินค้าอื่นๆ",
        icon: <AiOutlineUnorderedList />,
        pathname: "ProductList",
      },
      {
        name: "สินค้าตัวอย่าง",
        icon: <AiOutlineUnorderedList />,
        pathname: "ExampleList",
      },
    ],
  },
  {
    title: "เพิ่มสินค้า",
    links: [
      {
        name: "เพิ่มสินค้าเสื้อผ้าขวัญตา",
        icon: <GiClothes />,
        pathname: "AddClothproduct",
      },
      {
        name: "เพิ่มสินค้าตัวอย่าง",
        icon: <GiClothes />,
        pathname: "AddExample",
      },
      {
        name: "เพิ่มสินค้าขวัญตา",
        icon: <MdAddShoppingCart />,
        pathname: "AddKhwantaProduct",
      },
      {
        name: "เพิ่มสินค้ารับซื้อ",
        icon: <MdOutlineImportExport />,
        pathname: "AddImportProduct",
      },
      {
        name: "เพิ่มผู้ส่งสินค้า",
        icon: <MdOutlineImportExport />,
        pathname: "AddSupplier",
      },
    ],
  },
  {
    title: "ผ้า",
    links: [
      {
        name: "รายการ",
        icon: <GiRolledCloth />,
        pathname: "Fabric",
      },
      {
        name: "เพิ่มผ้า",
        icon: <GiRolledCloth />,
        pathname: "AddFabric",
      },
      {
        name: "เพิ่มเทคนิคการทอ",
        icon: <GiRolledCloth />,
        pathname: "AddFabricWeaving",
      },
      {
        name: "เพิ่มลายผ้า",
        icon: <GiRolledCloth />,
        pathname: "AddFabricPattern",
      },
    ],
  },
];
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
    title: "Order",
    icon: <MdShoppingCart />,
    pathname: "order",
    priority: 0,
  },
  {
    title: "Shop",
    icon: <AiFillShop />,
    pathname: "shop",
    priority: 0,
  },
  {
    title: "Customer",
    icon: <AiFillShop />,
    pathname: "customer",
    priority: 0,
  },
  {
    title: "Stock",
    icon: <AiFillShop />,
    pathname: "stock",
    priority: 0,
  },
  {
    title: "Employee",
    icon: <GiOrganigram />,
    pathname: "employee",
    priority: 1,
  },
];
