import { UserInfo } from "@/components/user-info";
import { currentUserAuth } from "@/lib/auth";

const Server = async () => {
    const user = await currentUserAuth();
    return ( 
        <UserInfo 
            label="User Info"
            user={user}        
        />
     );
}
 
export default Server;