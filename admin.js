async function isAdmin() {
    const { data } = await database.auth.getSession();
    return data.session?.user?.user_metadata?.role === 'admin';
    

    
}