export default function GoogleMaps() {
    return (
        <>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.796131248732!2d-0.10728142308451513!3d51.51695611000486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b528e240a27%3A0xd4905ce18f3802f3!2s24%20Holborn%20Viaduct%2C%20London%20EC1A%202BN%2C%20UK!5e0!3m2!1sen!2sng!4v1767363067627!5m2!1sen!2sng"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
                className="w-full h-full rounded-xs"
            >
            </iframe>
        </>
    )
}