import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, Globe, Star, Trash2 } from 'lucide-react';

interface Domain {
    id: number;
    domain: string;
    full_domain: string;
    type: 'subdomain' | 'custom';
    is_primary: boolean;
    is_verified: boolean;
    created_at: string;
}

interface DomainsIndexProps {
    domains: Domain[];
}

export default function DomainsIndex({ domains }: DomainsIndexProps) {
    const [domainType, setDomainType] = useState<'subdomain' | 'custom'>('subdomain');

    const { data, setData, post, processing, errors, reset } = useForm({
        domain: '',
        type: 'subdomain',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/domains', {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleSetPrimary = (domainId: number) => {
        router.put(`/domains/${domainId}/primary`);
    };

    const handleDelete = (domainId: number) => {
        if (confirm('Are you sure you want to delete this domain?')) {
            router.delete(`/domains/${domainId}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Domains" />

            <div className="p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Domains</h1>
                        <p className="text-gray-700 mt-2">
                            Manage your custom domains and subdomains for your content creator profile.
                        </p>
                    </div>

                    {/* Add Domain Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Domain</CardTitle>
                            <CardDescription>
                                Add a subdomain or custom domain for your profile
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Domain Type</Label>
                                    <Select
                                        value={data.type}
                                        onValueChange={(value: 'subdomain' | 'custom') => {
                                            setData('type', value);
                                            setDomainType(value);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select domain type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="subdomain">Subdomain</SelectItem>
                                            <SelectItem value="custom">Custom Domain</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="domain">
                                        {domainType === 'subdomain' ? 'Subdomain' : 'Custom Domain'}
                                    </Label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id="domain"
                                            type="text"
                                            value={data.domain}
                                            onChange={(e) => setData('domain', e.target.value)}
                                            placeholder={domainType === 'subdomain' ? 'mysite' : 'example.com'}
                                            className={errors.domain ? 'border-red-500' : ''}
                                        />
                                        {domainType === 'subdomain' && (
                                            <span className="text-gray-500 whitespace-nowrap">
                                                .example.localhost
                                            </span>
                                        )}
                                    </div>
                                    {errors.domain && (
                                        <p className="text-sm text-red-500">{errors.domain}</p>
                                    )}
                                    {domainType === 'custom' && (
                                        <p className="text-sm text-gray-500">
                                            Make sure to point your domain's DNS to this server
                                        </p>
                                    )}
                                </div>

                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Adding...' : 'Add Domain'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Domains List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Domains</CardTitle>
                            <CardDescription>
                                {domains.length} domain{domains.length !== 1 ? 's' : ''} configured
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {domains.length === 0 ? (
                                <div className="text-center py-8">
                                    <Globe className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                        No domains yet
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Get started by adding a domain above.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {domains.map((domain) => (
                                        <div
                                            key={domain.id}
                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="text-lg font-medium text-gray-900">
                                                        {domain.full_domain}
                                                    </h4>
                                                    {domain.is_primary && (
                                                        <Badge className="flex items-center space-x-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                                                            <Star className="h-3 w-3" />
                                                            <span>Primary</span>
                                                        </Badge>
                                                    )}
                                                    {domain.is_verified ? (
                                                        <Badge className="flex items-center space-x-1 bg-green-100 text-green-800 hover:bg-green-100">
                                                            <Check className="h-3 w-3" />
                                                            <span>Verified</span>
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                                            <AlertCircle className="h-3 w-3" />
                                                            <span>Pending</span>
                                                        </Badge>
                                                    )}
                                                    <Badge className="flex items-center space-x-1 bg-gray-100 text-gray-800 hover:bg-gray-100">
                                                        {domain.type === 'subdomain' ? 'Subdomain' : 'Custom'}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Added on {new Date(domain.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {!domain.is_primary && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleSetPrimary(domain.id)}
                                                    >
                                                        Set as Primary
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(domain.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

