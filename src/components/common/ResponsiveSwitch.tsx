// components/Responsive.tsx (enhanced version)


import {ReactNode} from 'react';

interface ResponsiveRootProps {
    children: ReactNode;
}

interface ResponsiveVariantProps {
    children: ReactNode;
}

function ResponsiveAdapterRoot({ children }: ResponsiveRootProps) {
    return (
        <div>{children}</div>
    );
}

const ResponsiveAdapterMobile = ({ children }: ResponsiveVariantProps) => {
    return <div>AAAA</div>
    // // const { isMobile } = useResponsive();
    // const isMobile = true;
    // return (<div>
    //
    //     {/*{isMobile ? children : <div>AAA</div>}*/}
    // </div>
    // )
}

function ResponsiveAdapterDesktop({ children }: ResponsiveVariantProps) {
    return <div>BBBB</div>
    // const isDesktop = true;
    // // const { isDesktop } = useResponsive();
    // return (<div>
    //
    //     {/*{isDesktop ? <>{children}</> : <></>}*/}
    // </div>
    // )
}

export const ResponsiveAdapter = Object.assign(ResponsiveAdapterRoot, {
    Mobile: ResponsiveAdapterMobile,
    Desktop: ResponsiveAdapterDesktop,
});