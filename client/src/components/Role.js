import React, { useRef, useEffect } from 'react'

function Role({ role }) {

    const roleRef = useRef();
    const infoRef = useRef();

    useEffect(() => {
        infoRef.current.style.display = "none";

        roleRef.current.onclick = () => {
            infoRef.current.style.display = infoRef.current.style.display === "none" ? "" : "none";
        }

        document.addEventListener('click', (ev) => {
            if(!ev.path.includes(infoRef.current) && !ev.path.includes(roleRef.current) && infoRef.current.style.display !== "none") {
                infoRef.current.style.display = "none";
            }
        }); 
    }, []);

    return (
        <>
            <div ref={roleRef} className='role'>
                {role.name}
                <div ref={infoRef} className='info'>
                    {role.permissions && (<>
                        <h4>Permissions:</h4>
                            {role.permissions.map(p => (<>{p}<br /></>))}
                    </>)}
                </div>
            </div>            
        </>
    );
}

export default Role;