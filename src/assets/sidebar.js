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
    priority: 4,
  },
  {
    title: "ดีไซน์",
    icon: <MdDesignServices />,
    pathname: "design",
    priority: 4,
  },
  {
    title: "สินค้า",
    icon: <GiClothes />,
    pathname: "product",
    priority: 4,
  },
  {
    title: "ผ้า",
    icon: <GiRolledCloth />,
    pathname: "fabric",
    priority: 4,
  },
  {
    title: "Order",
    icon: <MdShoppingCart />,
    pathname: "order",
    priority: 4,
  },
  {
    title: "Event",
    icon: <AiFillShop />,
    pathname: "event",
    priority: 4,
  },
  {
    title: "Employee",
    icon: <GiOrganigram />,
    pathname: "employee",
    priority: 3,
  },
];
