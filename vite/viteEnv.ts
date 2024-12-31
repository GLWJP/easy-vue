import {ImportMetaEnv} from "../src/vite-env";

/**
 * 解析环境变量
 * @param env Record<string, string>
 * @returns ImportMetaEnv
 */
function parseEnv(env: Record<string, string>): ImportMetaEnv {
    const parsedEnv: Record<string, any> = {};

    for (const key in env) {
        if (!Object.prototype.hasOwnProperty.call(env, key)) {
            console.warn(`环境变量 ${key} 不存在`);
            continue;
        }

        let value = env[key];

        // 布尔类型解析
        if (value === 'true' || value === 'false') {
            parsedEnv[key] = value === 'true';
            continue;
        }

        // 数字类型解析
        if (!isNaN(Number(value)) && value.trim() !== '') {
            parsedEnv[key] = Number(value);
            continue;
        }

        // JSON 类型解析
        if (value.startsWith('{') && value.endsWith('}')) {
            try {
                parsedEnv[key] = JSON.parse(value);
                continue;
            } catch (error) {
                console.error(`请检查环境变量 ${key} 的值是否正确，无法解析 JSON 类型的值: ${value}`);
                process.exit(1);
            }
        }

        // 数组类型解析
        if (value.startsWith('[') && value.endsWith(']')) {
            try {
                parsedEnv[key] = JSON.parse(value);
                continue;
            } catch (error) {
                console.error(`请检查环境变量 ${key} 的值是否正确，无法解析数组类型的值: ${value}`);
                parsedEnv[key] = value;
            }
        }

        // 默认处理为字符串类型
        parsedEnv[key] = value;
    }

    return parsedEnv as ImportMetaEnv;
}

export default parseEnv;