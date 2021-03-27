import React, { useState } from 'react'

const ImgFile = () => {

    const [imgErr, setImgErr] = useState("")
    const [filename, setFileName] = useState("Choose Avatar")
    const [avatarPreview, setAvatarPreview] = useState(null)



    const onChange = (e) => {

    }
    return (
        <>
            <div className="col-2">
                {avatarPreview ? (
                    <img src={avatarPreview} alt=""
                        style={{ width: "100%", height: "80%", borderRadius: "50%" }}
                    />
                ) : (
                    <i className="fa fa-2x fa-user"></i>
                )}
            </div>
            <div className="col-10">
                <div className="custom-file">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                {imgErr &&
                    <div className=" text-danger">
                        {imgErr}
                    </div>}
            </div>
        </>
    )
}

export default ImgFile
