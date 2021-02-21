import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
const Thumbnail = ({ file, className: classes }) => {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (!file || typeof file === "string") return;

    setLoading(true);
    let reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        setLoading(false);
        setImg(reader.result);
      }, 1000);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <>
      {loading ? (
        <ReactLoading
          type="spin"
          color={"var(--color-primary)"}
          height={30}
          width={30}
        />
      ) : (
        <img src={img} className={classes} />
      )}
    </>
  );
};

export default Thumbnail;
