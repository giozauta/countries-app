import style from './Footer.module.css'

 const Footer: React.FC = () => {
  return (
    <div className={style.footer}>
      <div className={style.footerBox}>
      <a href="https://www.facebook.com/zautagio" target="_blank">
            <img className={style.icon} src="../../../public/icons/facebook.png" alt="facebook" />
        </a>
        <a href="https://github.com/giozauta" target="_blank" >
            <img className={style.icon} src="../../../public/icons/github.png" alt="github" />
        </a>
        <a href="https://www.linkedin.com/in/giorgi-zautashvili-9779a7215/" target="_blank" >
            <img className={style.icon} src="../../../public/icons/linkedin.png" alt="linkedin" />
        </a>
      </div>
    </div>
  )
}

export default Footer;