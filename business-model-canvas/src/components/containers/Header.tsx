import ColorSchemeToggle from "../ui/ColorSchemeToggle";
import Toggle from "../ui/Toggle";
import * as Icon from 'react-feather';

type HeaderProps = { manageCanvasesText: string; helpText: string };

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header className="col-span-5 row-start-1 gradient-bg">
            <div className="w-full  max-w-7xl mx-auto flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                    <span data-lang="en" className="hidden">
                        Business Model Canvas
                    </span>
                    <span data-lang="nl">Business Model Canvas</span>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <button
                                id="manage-canvases-btn"
                                className="hover:underline flex items-center"

                            >
                                <Icon.Layers className="mr-1" />
                                <span>
                                    {props.manageCanvasesText}
                                </span>
                            </button>
                        </li>
                        <li>
                            <button id="help-btn" className="hover:underline flex items-center">
                                <Icon.HelpCircle className="mr-1" />
                                <span >
                                    {props.helpText}
                                </span>
                            </button>
                        </li>
                        <li className="flex items-center">

                            <ColorSchemeToggle />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
