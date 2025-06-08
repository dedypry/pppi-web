// OrgChart.tsx
import { Avatar, Card, CardBody, CardHeader } from '@heroui/react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

// Styled component untuk node chart
const StyledNode = styled.div`
    padding: 10px 15px;
    border-radius: 8px;
    display: inline-block;
    background-color: #f0f9f0;
    color: #0e6308;
    border: 2px solid #15980d;
    font-weight: bold;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export default function Organization() {
    return (
        <Card>
            <CardHeader>Struktur Organisasi</CardHeader>
            <div className="overflow-auto p-4">
                <Tree
                    label={
                        <div className="inline-block">
                            <Card className="min-w-[120px] border border-primary text-center">
                                <CardBody className="flex flex-col items-center gap-2">
                                    <Avatar size="lg" isBordered />
                                    <p>CEO</p>
                                </CardBody>
                            </Card>
                        </div>
                    }
                    lineWidth="1px"
                    lineColor="#15980d"
                    lineBorderRadius="10px"
                >
                    <TreeNode label={<StyledNode>Developer 1</StyledNode>} >
                    <TreeNode label={<StyledNode>VP of Engineering</StyledNode>}>
                        <TreeNode label={<StyledNode>Engineering Manager</StyledNode>}>
                            <TreeNode label={<StyledNode>Developer 1</StyledNode>} />
                            <TreeNode label={<StyledNode>Developer 2</StyledNode>} />
                        </TreeNode>
                    </TreeNode>
                    <TreeNode label={<StyledNode>VP of Marketing</StyledNode>}>
                        <TreeNode label={<StyledNode>Marketing Lead</StyledNode>}>
                            <TreeNode label={<StyledNode>Content Specialist</StyledNode>} />
                            <TreeNode label={<StyledNode>SEO Expert</StyledNode>} />
                        </TreeNode>
                    </TreeNode>
                    <TreeNode label={<StyledNode>VP of Sales</StyledNode>} />
                    </TreeNode>
                </Tree>
            </div>
        </Card>
    );
}
