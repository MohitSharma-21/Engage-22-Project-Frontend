import styles from "../../../styles/gallery/index/folderListItem.module.css";
import Link from "next/link";
import { Icon } from "@iconify/react";

const FolderListItem = ({ item }) => {
  return (
    <Link href={`/gallery/${item._id}`}>
      <a
        className={`${styles.links} md:m-2 m-3 w-120px flex flex-col justify-center items-center rounded-lg`}
      >
        <Icon
          className={`p-3`}
          icon="clarity:image-gallery-solid"
          style={{
            width: "100px",
            height: "100px",
          }}
        />

        {/* if file name is too long */}
        {item.image_label.length > 10 && (
          <div className="w-full p-1 text-lg font-semibold text-center flex justify-center items-center border-2 border-solid border-white rounded">
            {`${item.image_label.substring(0, 8)}..`}
          </div>
        )}

        {/* if file name is not too long */}
        {item.image_label.length <= 10 && (
          <div className="w-full p-1 text-lg font-semibold text-center flex justify-center items-center border-2 border-solid border-white rounded">
            {item.image_label}
          </div>
        )}
      </a>
    </Link>
  );
};

export default FolderListItem;
