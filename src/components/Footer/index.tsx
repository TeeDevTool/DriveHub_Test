import "./index.css";

interface IFooterProps {}

const Footer: React.FC<IFooterProps> = () => {
  return (
    <div className="footer">
      <div className="footerDetails">
        <p className="footerCompanyName">Drivehub Co.,Ltd</p>
        <p className="footerCompanyAddress">
          193-195 Lake Rajada Office Complex, Ratchadapisek road, Khlong Toei, Bangkok
        </p>
      </div>
      <div className="footerCopyrightWrapper">
        <p className="footerCopyright">© Drivehub 2023</p>
      </div>
    </div>
  );
};

export default Footer;
