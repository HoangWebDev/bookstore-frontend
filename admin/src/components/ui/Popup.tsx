function Popup({ visible, setVisible, children }: { visible: boolean, setVisible: (visible: boolean) => void, children: React.ReactNode }) {
    return (
        <div
            onClick={() => setVisible(false)}
            className={`
          fixed z-50 inset-0 flex justify-center items-center transition-colors
          ${visible ? "visible bg-black/20" : "invisible"}
        `}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-lg">
                {children}
            </div>
        </div>
    );
}

export default Popup;