import { useEffect } from "react";
import { createAddUserToGroupFetcher } from "../../backendRequests/fetchers";
import { useUserInfo } from "../../backendRequests/fetchHooks";
import { useNavigate, useParams } from "react-router-dom";

export function GroupRegisterLink() {
    const { id } = useParams();
    const [userInfo, userInfoStatus, loading] = useUserInfo();
    const navigate = useNavigate();

    useEffect(() => {
        const joinGroup = async () => {
            if (!id) {
                navigate("/404");
                return;
            }

            if (userInfoStatus === 200) {
                const [, status] = await createAddUserToGroupFetcher(userInfo.id, id);

                if (status === 200) {
                    navigate("/");
                } else {
                    navigate("/404");
                }
            }
        };

        if (!loading) {
            joinGroup();
        }
    }, [id, userInfo, userInfoStatus, loading, navigate]);

    return (
        <div>
            <h1>Присоединение к группе...</h1>
        </div>
    );
}