import * as RadixCollapsible from "@radix-ui/react-collapsible";
import React from "react";

interface CollapsibleProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
    isOpen: boolean;
    onToggle: (open: boolean) => void;
}

const Collapsible: React.FC<CollapsibleProps> = ({ content: children, trigger, isOpen, onToggle }) => {
    return(
        <RadixCollapsible.Root open={isOpen} onOpenChange={onToggle}>
            <RadixCollapsible.Trigger asChild>
                {trigger}
            </RadixCollapsible.Trigger>
            <RadixCollapsible.Content className="space-y-3">
                {children}
            </RadixCollapsible.Content>
        </RadixCollapsible.Root>
    )
};

export default Collapsible;