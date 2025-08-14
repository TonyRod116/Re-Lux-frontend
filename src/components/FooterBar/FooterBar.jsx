import './FooterBar.css'

export default function FooterBar(){
  return (
    <div className="footer-bar">
      &copy; Re-Lux {new Date().getFullYear()}
    </div>
  )
}